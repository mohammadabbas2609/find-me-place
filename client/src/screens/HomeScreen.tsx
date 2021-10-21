import { useEffect } from "react";

const HomeScreen = () => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        return true;
      });
    }
  }, []);

  return <div>Homescreen</div>;
};

export default HomeScreen;
