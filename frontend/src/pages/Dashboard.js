import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container flex-grow-1">
        <div className="row">
          <div className="col-2">Parte Izquierda</div>
          <div className="col-8">Centro</div>
          <div className="col-2">Parte Derecha</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
