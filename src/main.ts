import "./style.css";
import { App } from "./app";
import { LoginView } from "./componets/LoginView";
import { AppView } from "./componets/AppView";

const app = new App();
await app.init();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="flex justify-center items-center h-screen bg-black text-white">
  <div id="divState" class="w-full">
  </div>  
</div>
`;

if (await app.isLoggedIn()) {
  currentView(AppView);
  document.querySelector<Element>("#divState > div  ")!.innerHTML = `
    <div>
      <h1 class="text-4xl">Simple AppView</h1>
      <p>Welcome Back Friend ${await app.userId}</p>
    </div>
    <div>
      Current Value: 
    </div>
  `
} else {
  currentView(LoginView);
  document.querySelector("#button")?.addEventListener("click", async (e) => {
    if (await app.login()) currentView(AppView);
  });
}

async function currentView(View) {
  let divState = document.querySelector<Element>("#divState");
  divState!.innerHTML = "";
  divState!.innerHTML = View;
}
