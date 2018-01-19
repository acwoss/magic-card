const cartas = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const naipes = ['ouro', 'copas', 'paus', 'espada'];

class Pack {

    constructor() {
        let pack = [];
        
        while (pack.length < 21)
        {
          let carta = cartas[Math.floor(Math.random() * cartas.length)];
          let naipe = naipes[Math.floor(Math.random() * naipes.length)];
          
          let exists = false;
          for (let c = 0; c < pack.length; c++)
          {
            if (pack[c].innerHTML == carta && pack[c].className.indexOf(naipe) !== -1)
            {
              exists = true;
              break;
            }
          }
          
          if (!exists)
          {
            let card = document.createElement("div");
            card.innerHTML = carta;
            card.className = "carta " + naipe;
            pack.push(card);
          }
        }

        this.pack = pack;
        this.groups = [];
    }

    show() {
        let self = this;
        document.body.innerHTML = '';
        for (let i = 0; i < this.pack.length; i += 7)
        {
          let row = document.createElement("div");
          row.className = "row";
      
          row.addEventListener("click", function(event) {
            event.preventDefault();
            self.click(this);
          });
      
          this.pack.slice(i, i+7).forEach(card => row.appendChild(card));
          
          document.body.appendChild(row);
        }
    }

    click(row) {
        if (this.groups.length < 3) {
            this.groups.push(Array.from(row.childNodes));
        }
        
        if (this.groups.length == 3) {
            this.finish();
        } else {
            this.shuffle();
            this.show();
        }
    }

    shuffle() {
        let rows = Array.from(document.querySelectorAll(".row"));
        rows = rows.map(row => Array.from(row.childNodes));
        let pack = [];
        for (let i = 0; i < 7; i++)
        {
            for (let j = 0; j < rows.length; j++)
            {
                pack.push(rows[j][i]);
            }
        }
        this.pack = pack;
    }

    finish() {
        let card = this.groups[0].filter(card => {
            return this.groups[1].indexOf(card) != -1 && this.groups[2].indexOf(card) != -1;
        })[0].cloneNode(true);

        card.style.position = "relative";
        card.style.top = "calc(50% - 100px)";
        card.style.left = "calc(50% - 75px)";

        let div = document.createElement("div");
        div.className = "result";
        div.appendChild(card);
        document.body.appendChild(div);
    }

}

window.onload = event => {
  let pack = new Pack();
  pack.show();
};