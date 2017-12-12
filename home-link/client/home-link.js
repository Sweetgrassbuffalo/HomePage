import React, { Component } from "react";
import { Components, replaceComponent } from "/imports/plugins/core/components/lib";

const MyCustomNavbar = (props) => (
  <nav>
    <Components.Brand />

    <div>
      custom stuff here...
    </div>

    <Components.Button>
      Click Me!
    </Components.Button>

    <Components.MainDropdown />
  </nav>
);


replaceComponent("NavBar", MyCustomNavbar);
