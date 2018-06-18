import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupQunit as setupPolly } from '@pollyjs/core';
import Pretender from 'pretender';

module('Acceptance | login with real server', function(hooks) {
  setupApplicationTest(hooks);

  test('login', async function(assert) {
    await visit('/login');
    assert.equal(currentURL(), '/login');
    await click('#login');
    assert.equal(currentURL(), '/after-login');
  });
});

module('Acceptance | login with pretender', function(hooks) {
  let server;

  hooks.before(() => {
    server = new Pretender();
    server.post('http://localhost:4200/api/token', function() {
      return [202, {"Content-Type": "application/json"},
        JSON.stringify({"access_token":"ACCESS_TOKEN","token_type":"bearer","expires_in":2592000,"refresh_token":"REFRESH_TOKEN","scope":"read","uid":100101,"info":{"name":"Mark E. Mark","email":"mark@thefunkybunch.com"}})
      ]
    });
  });

  hooks.after(() => {
    server.shutdown();
  });

  setupApplicationTest(hooks);

  test('login', async function(assert) {
    await visit('/login');
    assert.equal(currentURL(), '/login');
    await click('#login');
    assert.equal(currentURL(), '/after-login');
  });
});

module('Acceptance | login with polly', function(hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);

  test('login', async function(assert) {
    await visit('/login');
    assert.equal(currentURL(), '/login');
    await click('#login');
    assert.equal(currentURL(), '/after-login');
  });
});
