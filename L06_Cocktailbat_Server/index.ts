namespace L06_Server {
  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void{
    let url: RequestInfo = "https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt";
    console.log("Start");
    communicate(url);
    console.log("End");
  }
  async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    console.log("Response", response);
    let text: String = await response.text();
    console.log(text);
  }
}
//mongodb+srv://admin:<password>@eia2-s2nov.mongodb.net/test?retryWrites=true&w=majority