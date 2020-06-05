"use strict";
var Haushaltshilfe;
(function (Haushaltshilfe) {
    window.addEventListener("load", init);
    let shoppingList = [];
    let addArticleButton;
    let articleListContainer;
    let addWorkButton;
    let workListContainer;
    let addBankButton;
    let bankListContainer;
    function init() {
        getReferences();
        addEventListeners();
    }
    function getReferences() {
        addArticleButton = document.querySelector("#addArticleButton");
        articleListContainer = document.querySelector("#articleList");
        addWorkButton = document.querySelector("#addWorkButton");
        workListContainer = document.querySelector("#workList");
        addBankButton = document.querySelector("#addBankButton");
        bankListContainer = document.querySelector("#bankList");
    }
    function addEventListeners() {
        addArticleButton.addEventListener("click", addArticle);
    }
    function addArticle() {
        let taskContainer = createTaskContainer();
        let articleSelect = createArticleSelect();
        let amountInput = createAmountInput();
        let unitInput = createSelect();
        let preferredShopSelect = createShopSelect();
        let priceBefore = document.createElement("span");
        let priceElement = document.createElement("span");
        let priceAfter = document.createElement("span");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", deleteArticle);
        priceBefore.innerText = " = ";
        priceAfter.innerText = " €";
        taskContainer.appendChild(articleSelect);
        taskContainer.appendChild(amountInput);
        taskContainer.appendChild(unitInput);
        taskContainer.appendChild(preferredShopSelect);
        taskContainer.appendChild(priceBefore);
        taskContainer.appendChild(priceElement);
        taskContainer.appendChild(priceAfter);
        taskContainer.appendChild(deleteButton);
        articleListContainer.appendChild(taskContainer);
        let newArticle = {
            articleName: articleSelect.value,
            amount: parseFloat(amountInput.value),
            price: parseFloat(priceElement.innerText),
            unitType: [getUnit(getArticle(articleSelect), unitInput)],
            preferredShop: preferredShopSelect.value
        };
        articleSelect.addEventListener("change", updateUnits);
        taskContainer.addEventListener("change", updateArticle);
        shoppingList.push(newArticle);
        updateUnits();
        updateArticle();
        //<--------------------------------------------------------------------- Closures ------------------------------------------------------>
        function updateArticle() {
            let article = getArticle(articleSelect);
            let unit = getUnit(article, unitInput);
            priceElement.innerText = (article.price * unit.unitFactor * parseFloat(amountInput.value)).toFixed(2);
            newArticle.articleName = article.articleName;
            newArticle.amount = parseFloat(amountInput.value);
            newArticle.price = parseFloat(priceElement.innerText);
            newArticle.unitType = [unit];
            newArticle.preferredShop = preferredShopSelect.value;
        }
        function updateUnits() {
            while (unitInput.firstChild) {
                unitInput.firstChild.remove();
            }
            getArticle(articleSelect).unitType.forEach(element => {
                fillSelect(unitInput, element.unitName);
            });
        }
        function deleteArticle() {
            taskContainer.remove();
            for (let i = 0; i < shoppingList.length; i++) {
                if (shoppingList[i] === newArticle) {
                    shoppingList.splice(i, 1);
                }
            }
        }
        //<--------------------------------------------------------------------- Closures end -------------------------------------------------->
    }
    function createTaskContainer() {
        let container = document.createElement("div");
        return container;
    }
    function createArticleSelect() {
        let select = document.createElement("select");
        Haushaltshilfe.articleList.forEach(element => {
            let option = document.createElement("option");
            option.innerText = element.articleName;
            select.appendChild(option);
        });
        return select;
    }
    function createAmountInput() {
        let input = document.createElement("input");
        input.min = "0";
        input.step = "0.1";
        input.type = "number";
        input.value = "1";
        return input;
    }
    function createOption(_option) {
        let option = document.createElement("option");
        option.innerText = _option;
        return option;
    }
    function createSelect() {
        let select = document.createElement("select");
        return select;
    }
    function fillSelect(_select, _option) {
        _select.appendChild(createOption(_option));
    }
    function createShopSelect() {
        let select = document.createElement("select");
        for (let element in Haushaltshilfe.Shops) {
            let option = document.createElement("option");
            if (!isNaN(Number(element))) {
                option.innerText = Haushaltshilfe.Shops[element];
                select.appendChild(option);
            }
        }
        return select;
    }
    function getArticle(_articleSleect) {
        let article = Haushaltshilfe.articleList[0];
        Haushaltshilfe.articleList.forEach(element => {
            if (element.articleName == _articleSleect.value) {
                article = element;
            }
        });
        return article;
    }
    function getUnit(_article, _unitInput) {
        let unit = Haushaltshilfe.articleList[0].unitType[0];
        _article.unitType.forEach(element => {
            if (element.unitName == _unitInput.value) {
                unit = element;
            }
        });
        return unit;
    }
    /*
    let taskListElement: HTMLDivElement;
    let addTaskButton: HTMLButtonElement;
  
    let tasks: Task[];
  
    function init(): void {
      getReferences();
      addEventlisteners();
    }
  
    function getReferences(): void {
      taskListElement = <HTMLDivElement>document.querySelector("#tasks");
      addTaskButton = <HTMLButtonElement>document.querySelector("button#addTask");
    }
  
    function addEventlisteners(): void {
      addTaskButton.addEventListener("click", addTask);
    }
  
    function addTask(): void {
      let taskContainer: HTMLDivElement = document.createElement("div");
  
      let taskSelect: HTMLSelectElement = document.createElement("select");
      let taskOptions: HTMLOptionElement[] = createTaskOptions();
  
      taskOptions.forEach(element => {
        taskSelect.appendChild(element);
      });
  
      let taskValueContainer: HTMLDivElement = createTaskValueContainer(taskSelect.value);
  
      taskContainer.appendChild(taskSelect);
      taskContainer.appendChild(taskValueContainer);
      taskListElement.appendChild(taskContainer);
    }
  
    function createTaskValueContainer(_task: string): HTMLDivElement {
      let valueContainer: HTMLDivElement = document.createElement("div");
  
      switch (_task) {
        case "Shopping":
          valueContainer.appendChild(createShoppingContainer());
          break;
        case "Bank":
          break;
        case "Work":
          break;
      }
  
      return valueContainer;
    }
  
    function createShoppingContainer(): HTMLDivElement {
      let container: HTMLDivElement = document.createElement("div");
      let articleListContainer: HTMLDivElement = document.createElement("div");
  
      let addArticleButton: HTMLButtonElement = document.createElement("button");
      addArticleButton.type = "button";
      addArticleButton.innerText = "Add Article";
  
      container.appendChild(addArticleButton);
      return container;
    }
    function createTaskOptions(): HTMLOptionElement[] {
      let taskOptions: HTMLOptionElement[] = [];
  
      taskList.forEach(element => {
        let option: HTMLOptionElement = createOption(element);
        taskOptions.push(option);
      });
  
      return taskOptions;
    }
  
    function createOption(_element: string): HTMLOptionElement {
      let option: HTMLOptionElement = document.createElement("option");
      option.innerText = _element;
  
      return option;
    }*/
})(Haushaltshilfe || (Haushaltshilfe = {}));
//# sourceMappingURL=index.js.map