// import "../../itr-sass/lib/index.css";

const ItrSassPage = () => {
  return (
    <>
      <div>
        <h1>TODO:</h1>
        <p>
          this itr-sass page is importing the index.css file from itr-sass
          library but I have already assigned a global sass file inside the root
          html file. If I assign this one there then everything's gonna break.
          There is also a styled components css sitch with the navbar component.
          <br></br>
          Solution: maybe just disable the navbar for now or maybe the styled
          components css won't conflict because it doesn't seem to be
          conflicting currently.
        </p>
        <h1>Complete SASS</h1>
        <body>
          <h1>This is an h1</h1>
          <a href="#">this is an anchor tag</a>
          <p className="error">this is an error</p>
          <p className="notification">this is a notification</p>
          <button>click me</button>
          {/* colors  */}
          <h2>Colors</h2>
          <span className="text-primary">primary text</span> |
          <span className="text-secondary">secondary text</span> |
          <span className="text-error">error text</span> |
          <span className="text-info">info text</span> |
          <span className="text-blue">blue text</span> |
          <span className="text-red">red text</span> |
          <span className="text-green">green text</span> |
          <span className="text-yellow">yellow text</span> |
          <span className="text-purple">purple text</span> |
          <span className="text-orange">orange text</span> |
          <span className="text-gray">gray text</span>
          <br></br>
          <span className="bg-primary text-white">bg primary</span> |
          <span className="bg-secondary text-white">bg secondary</span> |
          <span className="bg-error text-white">bg error</span> |
          <span className="bg-info text-white">bg info</span> |
          <span className="bg-blue text-white">bg blue</span> |
          <span className="bg-red text-white">bg red</span> |
          <span className="bg-green text-white">bg green</span> |
          <span className="bg-yellow text-white">bg yellow</span> |
          <span className="bg-purple text-white">bg purple</span> |
          <span className="bg-orange text-white">bg orange</span> |
          <span className="bg-gray text-white">bg gray</span> |<br></br>
          <span className="bg-primary-dark-8 text-white">primary dark 8</span> |
          <span className="bg-primary-dark-6 text-white">primary dark 6</span> |
          <span className="bg-primary-dark-4 text-white">primary dark 4</span> |
          <span className="bg-primary-dark-2 text-white">primary dark 2</span> |
          <span className="bg-primary text-white">primary</span> |
          <span className="bg-primary-light-2 text-white">primary light 2</span>{" "}
          |
          <span className="bg-primary-light-4 text-white">primary light 4</span>{" "}
          |
          <span className="bg-primary-light-6 text-white">primary light 6</span>{" "}
          |
          <span className="bg-primary-light-8 text-white">primary light 8</span>{" "}
          |{/* font sizes  */}
          {/* button */}
          {/* cards */}
          <h2>Cards</h2>
          <div className="card">
            <h1 className="card-title">This is a title</h1>
            <p className="card-body">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In sunt,
              quo totam aliquam praesentium ducimus tempore sapiente quia nulla
              optio? Lorem ipsum, dolor sit amet consectetur{" "}
              <a href="">adipisicing elit</a>. Libero laboriosam laborum
              exercitationem autem commodi voluptas odio aliquid ut velit
              doloremque minima, quaerat dolores, corporis consequuntur totam
              nam id veniam maxime.
            </p>
          </div>
          {/* grid system  */}
          {/* utilities  */}
        </body>
      </div>
    </>
  );
};

export default ItrSassPage;
