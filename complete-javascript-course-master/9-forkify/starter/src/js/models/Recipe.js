import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ing = res.data.recipe.ingredients;

    } catch(error) {
      console.log(error);
      alert('Bruh');
    }
  }

  calcTime() {
    const numIng = this.ing.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIng() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']

    const newIng = this.ingredients.map(el => {
      // Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // Remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ')



      // Separate unit and ingredient
      const ingArr = ingredient.split(' ');
      const unitIndex = ingArr.findIndex(el2 => unitsShort.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // there is a unit
        const arrCount = arrIng.slice(0, unitIndex); //ex. 4 1/2 cups, arr count = [4, 1/2]
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count, 
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }

      } else if (parseInt(ingArr[0], 10)) {
        // there is no unit, but first element is a number
        objIng = {
          count: parseInt(ingArr[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }

      } else if (unitIndex === -1) {
        // there is no unit and no number in first position
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }


      return objIng;

    });
    this.ing = newIng;
  }
}

