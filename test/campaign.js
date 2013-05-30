var chai        = require('chai');
var helper      = require('./helper.js');
var createsend  = require('..')
var should      = chai.should();
var apiKey      = '123123123123123123123';
var clientId    = '87y8d7qyw8d7yq8w7ydwqwd';

var api = new createsend({ apiKey: apiKey });

describe('Campaigns', function () {
  it('create a campaign', function (done) {
    helper.stubPost('campaigns/' + clientId + '.json', 'create_campaign.json');
    api.campaigns.create(clientId, {
        'Name': 'name',
        'Subject': 'subject',
        'FromName': 'g\'day',
        'FromEmail': 'good.day@example.com',
        'ReplyTo': 'good.day@example.com',
        'HtmlUrl': 'http://example.com/campaign.html',
        'TextUrl': 'http://example.com/campaign.txt',
        'ListIDs': [
          '7y12989e82ue98u2e',
          'dh9w89q8w98wudwd989'
        ],
        'SegmentIDs': [
          'y78q9w8d9w8ud9q8uw', 
          'djw98quw9duqw98uwd98'
        ]
      }, 
      function (err, campaignId) {
        campaignId.should.equal('787y87y87y87y87y87y87');
        done();
      }
    );
  });

  it('create a campaign from a template', function (done) {
    templateContent = {
      Singlelines: [
        {
          Content: 'This is a heading',
          Href: 'http://example.com/'
        }
      ],
      Multilines: [
        {
          Content: '<p>This is example</p><p>multiline \
          <a href="http://example.com">content</a>...</p>'
        }
      ],
      Images:[
        {
          Content: 'http://example.com/image.png',
          Alt: 'This is alt text for an image',
          Href: 'http://example.com/'
        }
      ],
      Repeaters: [
        {
          Items: [
            {
              Layout: 'My layout',
              Singlelines: [
                {
                  Content: 'This is a repeater heading',
                  Href: 'http://example.com/'
                }
              ],
              Multilines: [
                {
                  Content: '<p>This is example</p><p>multiline \
                  <a href="http://example.com">content</a>...</p>'
                }
              ],
              Images: [
                {
                  Content: 'http://example.com/repeater-image.png',
                  Alt: 'This is alt text for a repeater image',
                  Href: 'http://example.com/'
                }
              ]
            }
          ]
        }
      ]
    }

    helper.stubPost('campaigns/' + clientId + '/fromtemplate.json', 'create_campaign.json');
    api.campaigns.createFromTemplate(clientId, {
        'Subject': 'subject',
        'Name': 'name',
        'FromName': 'g\'day',
        'FromEmail': 'good.day@example.com',
        'ReplyTo': 'good.day@example.com',
        'ListIDs': [ '7y12989e82ue98u2e', 'dh9w89q8w98wudwd989' ], 
        'SegmentIDs': [ 'y78q9w8d9w8ud9q8uw', 'djw98quw9duqw98uwd98' ],
        'TemplateID': '7j8uw98udowy12989e8298u2e', 
        'TemplateContent': templateContent
      },
      function (err, campaignId) {
        campaignId.should.equal('787y87y87y87y87y87y87');
        done();
      }
    )
  });
});