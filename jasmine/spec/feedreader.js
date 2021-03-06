/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite -. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not empty.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('url defined & is not empty', function (){
      for(let feed of allFeeds){
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* Test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
    it('name is defined', function (){
      for(let feed of allFeeds){
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });


  /* Test suite named "The menu" */
  describe('The menu', function() {
    const body = document.querySelector('body');
    const menu = document.querySelector('.menu-icon-link');

    /* Test that ensures the menu element is hidden by default.*/
    it('menu is hidden',function(){
      expect(body.classList.contains('menu-hidden')).toBe(true);
    })
    /* Test that ensures the menu changes
    * visibility when the menu icon is clicked.
    * Two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('menu changes',function(){

      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(false);
      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(true);

    })
  });
  /* new test */
  describe('Initial Entries', function(){
    beforeEach(function (done) {
      loadFeed(0, done);
    })
    /* This test ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * loadFeed() is asynchronous so this test requires
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */

    it('There is an entry or more', function () {
      const feed = $('.feed .entry');
      expect(feed.length).toBeGreaterThan(0);
    })

  });
  /* Test suite that checks for Feeds changes*/
  describe('New Feed Selection', function() {
    /* Ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * loadFeed() is asynchronous.
    */
    let firstFeed, secondFeed;
    beforeEach(function(done) {
      loadFeed(0, function() {
        firstFeed = $(".feed").html();

        loadFeed(1, function() {
          secondFeed = $(".feed").html();
          done();
        });
      });
    });
    it('Content changes when feed is loaded', function() {
      expect(firstFeed).not.toBe(secondFeed);
    });
  });
}());
