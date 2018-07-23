const Data = require('../services/connect');
const email = require('../models/email');
const patient = require('../models/patient');

var AWS = require('aws-sdk');

AWS.config.update({ 
  "accessKeyId": "AKIAISMAPZZ6GJ4UGEQA",
  "secretAccessKey": "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",
  "region": "us-east-1"
});
var ses = new AWS.SES({
  "Version":"2012-10-17",
  "Statement":[
    {
      "Effect":"Allow",
      "Action":[
        "ses:*"
      ],
      "Resource":"*"
    }
  ]
});
var params = {
  Message: {
    Body: { Html: { Charset: "UTF-8" } },
    Subject: { Charset: 'UTF-8' }
  },
};
var dbPatientFind = async(PatientDB, patientId, find) => {
  var response;
  await PatientDB.findById({_id: patientId}, find).then(patient => response = patient);
  return response;
},
replaceHTML = (html, item, patternKeys) => {
  emailContent = html, positions = [], find = {};
  while (true) {
    var begin = emailContent.lastIndexOf('<span class="mention" contenteditable="false">');
    if (begin !== -1) {
      mentionFound = emailContent.substring(begin+46);
      emailContent = emailContent.substring(0, begin);
      var end = mentionFound.search('</span>'),
      key = mentionFound.substring(0, end).split('.');
      if (patternKeys.includes(key[0])) {
        if (['email', '_id', 'name'].includes(key[1])) {
          html = emailContent + item[key[1]] + html.substring(begin+46+end+7);
          if (positions.length>1) {
            diff = 46+end+7 - item[key[1]].length;
            positions = positions.map((itm) => { return {...itm, begin: itm.begin-diff, end: itm.end-diff} });
          }
        }
        else {
          find[key[1]] = 1;
          positions.push({key: key[1], begin: begin, end: begin+46+end+7});
        }
      }
    }
    else
      break;
  }
  return {html, positions, find}
};
module.exports = {
  async send(req, res, next){
    const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
    let Patientdb = db.model('patient', patient.patientSchema);
    let Emaildb = db.model('email', email.emailSchema);

    var count = 0, msg = {},
    dbSaveEmail = (messages) => {
      Emaildb.create({...req.body, sender: {user_id: req.session.user._id, name: req.session.user.name}, sent_at: new Date()})
        .then(() => res.send(messages));
    };
    params.Message.Subject.Data = req.body.title;
    params.Source = `"${req.session.clinic.name}" <no-reply@dentalqi.com>`
    for (var i=0; i<req.body.destination.length; i++) {
      var item = req.body.destination[i];
      const reponseEmail = replaceHTML(req.body.html, item, ['@Paciente', '@Destinat&aacute;rio']);
      item.html = reponseEmail.html;
      var find = reponseEmail.find, positionsEmail = reponseEmail.positions;
      const reponseHeader = replaceHTML(req.session.clinic.document_header, item, ['@Destinat&aacute;rio']);
      find = {...find, ...reponseHeader.find}
      var headerContent = reponseHeader.html, positionsHeader = reponseHeader.positions;
      const reponseFooter = replaceHTML(req.session.clinic.document_footer, item, ['@Destinat&aacute;rio']);
      find = {...find, ...reponseFooter.find}
      var footerContent = reponseFooter.html, positionsFooter = reponseFooter.positions;
      var awsSendEmail = (parameters) => {
        var sendPromise = ses.sendEmail(parameters).promise();
        sendPromise.then(
          (data) => {
            count++;
            msg[item.email] = data;
            if (count === req.body.destination.length)
              dbSaveEmail(msg);
          }
        ).catch(
          (err) => {
            count++;
            msg[item.email] = err;
            if (count === req.body.destination.length)
              dbSaveEmail(msg);
          }
        );
      }
      if (Object.keys(find).length>0) {
        const patient = await dbPatientFind(Patientdb, item._id, find);
        positionsEmail.map((itm) => item.html = item.html.substring(0, itm.begin) + patient[itm.key] + item.html.substring(itm.end));
        positionsHeader.map((itm) => headerContent = headerContent.substring(0, itm.begin) + patient[itm.key] + headerContent.substring(itm.end));
        positionsFooter.map((itm) => footerContent = footerContent.substring(0, itm.begin) + patient[itm.key] + footerContent.substring(itm.end));
      }
      params.Destination = { ToAddresses: [item.email] };
      params.Message.Body.Html.Data = (
        `<table border="0" width="100%" cellspacing="10" bgcolor="#ececec">
          <tbody>
            <tr>
              <td width="160" valign="middle">
                <img src="${req.session.clinic.logo_url}" width="160" />
              </td>
              <td valign="middle">
                ${headerContent}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          ${item.html}
        </div>
        <table border="0" width="100%" bgcolor="#ececec">
          <tbody>
            <tr>
              <td>
                ${footerContent}
              </td>
            </tr>
          </tbody>
        </table>`
      );
      awsSendEmail(params);
    }
  },
  fetch(req, res, next) {
    const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
    let Emaildb = db.model('email', email.emailSchema);
    Emaildb.find({})
      .then((emails) => res.send(emails))
  },
  get(req, res, next) {
    const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
    let Emaildb = db.model('email', email.emailSchema);
    Emaildb.findById({ _id: req.params.emailId })
      .then((email) => res.send(email))
  }
};