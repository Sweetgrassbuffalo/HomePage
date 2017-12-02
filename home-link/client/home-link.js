import { Components } from "@reactioncommerce/reaction-components";
import { replaceComponent } from "@reactioncommerce/reaction-components";

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
