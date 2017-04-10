var table = document.getElementById('table');
var inputs = [];

function createInput(x, y) {
  var el = document.createElement('input');
  el.id = x+"->"+y;
  el.classList.add('small');
  el.oninput = verify.bind(null, el);//verify.bind(this, [x, y]);
  var td = document.createElement('td');
  td.append(el);
  inputs.push(el);
  return td;
}

function verify(that){
  if(parseInt(that.value) > 9 || parseInt(that.value) < 1){
    that.value = "";
  } else {
    BroadCheck();
  }
}

function getCoords(x){
  return ( ( x.id.split('->') ).map( xx=>parseInt(xx) ) );
}

function getSector(xy){
  return( (3 * Math.floor(xy[1]/3)) +  Math.floor(xy[0]/3) );
}

function BroadCheck(){
  var errors = [];
  inputs.forEach(x=>x.classList=['small']);

  inputs.forEach(function(input){
    var xy = getCoords(input);
    if(input.value !== ""){
      var interests = (arr_merge(
        inputs.filter( function(item){
          var coords = getCoords(item);
          return (coords[0] === xy[0] ^ coords[1] === xy[1]);
        }),
        inputs.filter( i => (getSector(xy) === getSector(getCoords(i)) ) )
      )).filter(x=>x!==input);

      //interests.forEach(x=> x.classList.add('selected'));
      var errs = interests.filter(x=> x.value === input.value );
      errs.forEach(x=>errors.push(x));
    }

  });

  errors.forEach(x=> x.classList.add('ERROR'));
}


function arr_merge(array, merger){
  return array.concat( merger.filter(i=>array.indexOf(i)===-1) );
}



(function init(){
  //populate the sudoku board with inputs.
  for(var i = 0; i < 9; i++){
    var tr = document.createElement('tr');
    if(i === 0){
      tr.classList.add('upperBound');
    }
    if(i%3==2){
      tr.classList.add('row');
    }

    for(var j = 0; j < 9; j++){
      var inp = createInput(j, i);
      if(j%3 === 2){
        inp.classList.add('edge');
      } else if(j%3 === 0){
        inp.classList.add('leftBound');
      }
      tr.appendChild(inp);
    }
    table.appendChild(tr);
  }
})();
