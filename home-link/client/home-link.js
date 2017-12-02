import { Components } from "@reactioncommerce/reaction-components";

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
