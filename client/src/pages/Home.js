export default function Home() {
    return (
      <div id="home">
        <h1>HOMEPAGE</h1>
        <h1>WELCOME {JSON.parse(localStorage.getItem("user")).firstName.toUpperCase()}</h1>
      </div>
      );
  }