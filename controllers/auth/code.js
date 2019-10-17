const { User } = require('../../models');
const { default_from_email, allowed_origins, issuer } = require('../../config');
const { sendMail, mailtext, mailhtml } = require('../../util/mail');
const { EmailRegex } = require('../../util/regex');

module.exports = async (req, res) => {
  const { origin } = req.headers;
  const { email } = req.query;
  const allowed = allowed_origins.indexOf(origin) !== -1;
  if (!allowed) return res.json({ error: 'Invalid origin' });
  if (!email) return res.json({ error: 'Invalid email' });
  if (!EmailRegex.test(email)) return res.json({ error: 'Invalid email' });

  const code = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

  let user = null;
  user = await User.findOne({ where: { email }});
  if (user) {
    user.code = code;
    await user.save();
  } else {
    // create a login token and a user
    const user = await User.create({
      email,
      code,
    })
  }
  const txt = mailtext(code);
  const html = mailhtml(code);
  const sent = await sendMail(email, default_from_email, `Log In To ${issuer}`, txt, html);
  return res.json({ success: true });
}
