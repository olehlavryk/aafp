import React from 'react';
import { RoutesGenerator, routesConfig } from "src/utils/generator";
import { Notification } from "src/components/Notification/Notification";
import { useSelector } from 'react-redux';
import { notificationSelector } from 'src/store/selectors';
import "./App.css";

const App = () => {
  const notification = useSelector(notificationSelector);
  return (
    <div className="App">
      <RoutesGenerator config={routesConfig} />
      {
        notification && (
          <Notification notification={notification} />
        )
      }
    </div>
  );
}

export default App;
