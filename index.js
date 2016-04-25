var nodemailer = require('nodemailer');
var cheerio = require('cheerio');
var axiosModule = require('axios');


var axios = axiosModule.create({
  baseURL: 'http://www.paxsite.com/',
  timeout: 1000,
});


var parse = function (body) {
  var $ = cheerio.load(body);
  var text = $('#paxAus').text()
  find(text)
}

function find(body) {
  var x = body.match(/thank you/i)
  var y = body.match(/2015/)
  console.log(x)
  console.log(y)
  if (!x || !y) {
    // tickets are likely available
    email()
  }
}

axios.get('/')
  .then(function (response) {
    parse(response.data)
  })
  .catch(function (response) {
    console.log(response);
  });

var pw = process.env.GMAIL_PW;
var mailingList = [
  'sylvanknave@gmail.com'
]

function email() {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('sandbox8b101485357b48a7943338bb11160504.mailgun.org');

  var transporter = nodemailer.createTransport({
    transport: 'ses', // loads nodemailer-ses-transport
    accessKeyId: 'AWSACCESSKEY',
    secretAccessKey: 'AWS/Secret/key'
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'Mailgun Sandbox <postmaster@sandbox8b101485357b48a7943338bb11160504.mailgun.org>', // sender address
    to: mailingList.join(', '), // list of receivers
    subject: 'subject', // Subject line
    text: 'body of email', // plaintext body
    html: '<b>html body</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}
