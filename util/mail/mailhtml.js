const { issuer } = require('../../config');

module.exports = (code) => {
  return `
  <style type="text/css">
    @media screen {
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
      }

      ...

      body, h1, h2, h3, h4, h5, h6, p {
        font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;
      }
    </style>
    <div style="text-align: center;">
      <img src="https://s3.us-west-1.wasabisys.com/noco/logo.png" style="min-width: 200; width: 30%;"/>
      <p> Hi,</p>
      <p> Your code to log in to ${issuer} is</p>
      <h3> ${code} </h3>
    </div>
  `
}
