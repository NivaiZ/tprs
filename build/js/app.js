import { burgerMenuOpenHandler } from "./modules/burger.js";
import { helpMenuOpenHandler } from "./modules/extraMenu.js";
import { modalVisible } from "./modules/modal.js";
import { anchorHandler } from "./modules/anchor.js";
import { accordionHandler } from "./modules/accordion.js";
import { anchorButtonUp } from "./modules/anchorButton.js";

function handleDOMContentLoaded () {
  burgerMenuOpenHandler();
  helpMenuOpenHandler();
  modalVisible();
  anchorHandler();
  accordionHandler();
  anchorButtonUp();
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
