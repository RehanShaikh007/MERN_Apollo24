import React from 'react'
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero title={"Welcome to Apollo24 Medical Institute | Your trusted Health Care Provider"} imageUrl={"/hero2.png"}/>
      <Biography imageUrl={"/about3.png"}/>
      <Departments/>
      <MessageForm/>
    </>
  )
}

export default Home;
