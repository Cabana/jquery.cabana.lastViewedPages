describe('lastViewedPages', function() {
  var pages = null;

  beforeEach(function() {
    localStorage.clear();

    pages = new LastViewedPages();
  });

  it("doesn't come with pages already saved", function() {
    expect(pages.all()).toEqual([]);
  });

  it('saves an empty array to localStorage when constructored', function() {
    pages = new LastViewedPages();

    expect(localStorageGetObject('lastViewedPages')).toEqual([]);
  });

  describe('#addPage', function() {
    describe('when there are no pages saved', function() {
      it('saves the page at the start of the list', function() {
        pages.addPage({ title: "Cabana.dk", url: "http://cabana.dk" });

        expect(pages.all()).toEqual([
          { title: "Cabana.dk", url: "http://cabana.dk" }
        ]);
      });
    });

    describe('when there are pages saved', function() {
      it('saves the page at the top of the list', function() {
        pages.addPage({ title: "Cabana.dk", url: "http://cabana.dk" });
        pages.addPage({ title: "Google.dk", url: "http://google.dk" });

        expect(pages.all()).toEqual([
          { title: "Google.dk", url: "http://google.dk" },
          { title: "Cabana.dk", url: "http://cabana.dk" }
        ]);
      });
    });

    describe('when the page is already saved', function() {
      it('deletes the previous entry and adds the pages at the start of the list', function() {
        pages.addPage({ title: "Cabana.dk", url: "http://cabana.dk" });
        pages.addPage({ title: "Google.dk", url: "http://google.dk" });
        pages.addPage({ title: "Cabana.dk", url: "http://cabana.dk" });

        expect(pages.all()).toEqual([
          { title: "Cabana.dk", url: "http://cabana.dk" },
          { title: "Google.dk", url: "http://google.dk" }
        ]);
      });
    });

    it('saves the pages to localStorage', function() {
      pages.addPage({ title: "Cabana.dk", url: "http://cabana.dk" });
      pages.addPage({ title: "Google.dk", url: "http://google.dk" });
      pages.addPage({ title: "Cabana.dk", url: "http://cabana.dk" });

      expect(localStorageGetObject('lastViewedPages')).toEqual([
        { title: "Cabana.dk", url: "http://cabana.dk" },
        { title: "Google.dk", url: "http://google.dk" }
      ]);
    });
  });
});
