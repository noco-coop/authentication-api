const { User } = require('../../models');
const { allowed_origins, issuer, audience, expiresIn } = require('../../config');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const privateKEY = fs.readFileSync(path.join(__dirname, '../../certs/private.key'), 'utf8');
const publicKEY = fs.readFileSync(path.join(__dirname, '../../certs/public.key'), 'utf8');

module.exports = async (req, res) => {
  const { origin } = req.headers;
  const { email } = req.body;
  let { code } = req.body;
  code = Number(code);
  if (isNaN(code)) return res.json({ error: 'Invalid code' });
  const allowed = allowed_origins.indexOf(origin) !== -1;
  if (!allowed) return res.json({ error: 'Invalid origin' });
  if (typeof code !== 'number' || !code) return res.json({ error: 'Invalid code' });

  const signOptions = {
   issuer,
   subject: email,
   audience,
   expiresIn: `${expiresIn}h`,
   algorithm: "RS256"
  };


  let user = null;
  user = await User.findOne({ where: { email }});
  if (!user) return res.json({ error: 'Invalid user' });
  if (Number(user.code) !== Number(code)) return res.json({ error: 'Invalid code' });
  user.code = 0;

  const expires = moment().add(expiresIn, 'hours').toDate();
  console.log('EXPIRES', expires)
  console.log('as number', expires.getTime());
  // generate token
  const token = jwt.sign({
    email,
    userID: user.id,
    expires: user.expires,
    firstName: user.firstName,
    lastName: user.lastName,
    expires
  }, privateKEY, signOptions);

  await user.save();

  // const u = User.create({})
  return res.json({ success: true, user, token, expiresAt: expires.getTime() });
}
