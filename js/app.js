'use strict';
$(() => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
      const arrayOfCreatures = data;
      arrayOfCreatures.forEach(creature => {
        const actualCreature = new Creature(creature);
        Creature.all.push(actualCreature);
      });
      console.log(Creature.all);
    })
    .then(()=>{
      renderCreature();
    });
});

function Creature(creature) {
  this.title = creature.title;
  this.image_url = creature.image_url;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
  this.description = creature.description;
}

Creature.all = [];

Creature.prototype.render = function () {
  let $renderedCreature = $('.horned-template').clone();
  $renderedCreature.removeClass('horned-template');
  $renderedCreature.find('.title').text(this.title);
  $renderedCreature.find('.image_url').attr('src', this.image_url);
  $renderedCreature.find('.image_url').attr('alt', this.title);
  $renderedCreature.find('.description').text(this.description);
  $renderedCreature.find('.horns').text(this.horns);
  $renderedCreature.find('.keyword').text(this.keyword);
  return $renderedCreature;
};
 
function renderCreature() {
  Creature.all.forEach(creature => $('#photo-gallery').append(creature.render()));
  $('.horned-template').remove();
}