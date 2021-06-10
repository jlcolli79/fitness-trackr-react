const Home = ({ currentUser }) => {
  return (
    <div className="home-content">
      {currentUser && <h1>{currentUser} is logged in!</h1>}
      <h2>Get in shape fast with Fitness Trac.kr!</h2>
      <ul>
        <li>As a guest you can browse Routines and Activites</li>
        <li>As a registered user, you can create new routines and activities</li>
        <li>To get started click on the links above</li>
        <li>
          Click the Login/Register link above to create an account and start your fitness
          journey!
        </li>
      </ul>
    </div>
  );
};

export default Home;
