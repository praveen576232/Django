function loadTable(){

  var table = document.getElementById("table")
  table.style.border="1px solid black"
  table.style.padding="10px"
  table.style.cursor="default"
  var Tdata = document.getElementById("Tdata");
  if(Tdata.value!=null && Tdata.value!=undefined && Tdata.value!=""){
    var x;
    var y;
    
    var data = Tdata.value;
   
    var jsondata = JSON.parse(data)
    
    for( var i = 0; i<jsondata.table.length;i++){
      var col = jsondata.table[i].coldata;
      x= table.insertRow(i);
     
      for( var j = 0; j<col.length;j++){
        y= x.insertCell(j);  
        y.style.border="2px solid black"
        y.style.padding="10px"
        if(col[j].colspan!=null){
          y.setAttribute("colspan",col[j].colspan.toString())
        }
        if(col[j].rowspan!=null){
          y.setAttribute("rowspan",col[j].rowspan.toString())
        }
        var input = document.createElement("INPUT")
        input.setAttribute("type","text")
        input.setAttribute("maxlength","100")
        input.setAttribute("value",col[j].data)
        input.style.border="none";  
        input.style.width="80%"
        input.style.padding="10px"
        input.style.fontWeight = col[j].font !=null ?col[j].font:500
        input.style.backgroundColor="blanchedalmond" 
        y.appendChild(input)
      
  y.style.cursor="default"
        if(j==col.length-1)
        document.getElementById("row").value=col.length.toString();
      }
      if(i===jsondata.table.length-1){
        document.getElementById("col").value=jsondata.table.length.toString();
       
      }
    }


  }
  
 


}

    
    
    
    
    
    
    function addCol(){
        var table = document.getElementById("table")
         var col = document.getElementById("col")
        var row = document.getElementById("row")
    
        x= table.insertRow(-1);
        x.style.border="2px solid black"
    
    
        for(var c=0;c<parseInt(row.value);c++){
            y= x.insertCell(c);  
            var input = document.createElement("INPUT")
            input.setAttribute("type","text")
            input.setAttribute("maxlength","20")
            
            input.style.border="none";  
            input.style.width="80%"
            input.style.padding="10px"
            
            input.style.backgroundColor="blanchedalmond" 
            y.appendChild(input)
            y.style.border="2px solid black"
        }
        col.value = (parseInt(col.value)+1).toString();
    
    }
    function removeCol(){
        var table = document.getElementById("table")
        var col = document.getElementById("col")
        table.deleteRow(-1)  
      
       
       col.value = (parseInt(col.value)-1).toString();
       
    }
    function addRow(){
        var table = document.getElementById("table")
        var temp = document.getElementById("row")
    
      for(var i = 0 ; i<table.rows.length;i++){
         var row = table.rows[i];
    
           y= row.insertCell(-1);  
            var input = document.createElement("INPUT")
            input.setAttribute("type","text")
            input.setAttribute("maxlength","20")
            
            input.style.border="none";  
            input.style.width="80%"
            input.style.padding="10px"
            
            input.style.backgroundColor="blanchedalmond" 
            y.appendChild(input)
            y.style.border="2px solid black"
      }
      document.getElementById("row").value=(parseInt(temp.value)+1).toString();
      
      }
    
    
    
    function removeRow(){
        var table = document.getElementById("table")
        var temp = document.getElementById("row")
        
        for(var r=0;r<table.rows.length;r++){
           var row = table.rows[r];
            row.deleteCell(-1)
            
        }
        // row.setAttribute("value",parseInt(row.value)-1)
          document.getElementById("row").value=(parseInt(temp.value)-1).toString();
         
    }
    function removeTable(){
      var table = document.getElementById("table")
     var temp = document.getElementById("col").value
        
        for(var r=0;r<temp;r++){
          //  var row = table.rows[r];
            table.deleteRow(0)
            
        }
    
          
           document.getElementById("row").value="0";
               document.getElementById("col").value="0";
    }
    
    function createTable(){
       
        var row = document.getElementById("row").value
        var col = document.getElementById("col").value
        var table = document.getElementById("table")
        
        var x;
        var y;
        for( var r=0 ; r<parseInt(col);r++){
          x= table.insertRow(r);
          x.style.border="2px solid black"
    
    
          for(var c=0;c<parseInt(row);c++){
              y= x.insertCell(c);  
              var input = document.createElement("INPUT")
              input.setAttribute("type","text")
              input.setAttribute("maxlength","20")
              
              input.style.border="none";  
              input.style.width="80%"
              input.style.padding="10px"
              
              input.style.backgroundColor="blanchedalmond" 
              y.appendChild(input)
              y.style.border="2px solid black"
          }
        }
        table.style.border="1px solid black"
    
       
    
    }
    
   
    
    document.getElementById("fontchange").onclick = function(){
      if (selectedCellsCount == 0) { return; }
      for(var i in selectedCells){
      var input = selectedCells[i].getElementsByTagName("input")[0];
      input.style.fontWeight = "900"
      selectedCells[i].style.border="2px solid black"
     }
     selectedCells = {};
     selectedCellsCount = 0;
  } 
    
 
function save(){
  
  var table = document.getElementById("table");
   var Tabledata = [] ;  
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var data =[] ;
      var currentRow = table.rows[i];
      
   var len =      currentRow.getElementsByTagName("td").length;
   var td = currentRow.getElementsByTagName("td");
      for(var j =0 ; j<len ; j++){
        var input = td[j].getElementsByTagName("input")[0];
        var colspan = td[j].colspan;
        var rowspan = td[j].rowspan;
        data.push({"data":input,"colspan":colspan,"rowspan":rowspan})
      } 
   Tabledata.push({"coldata":data}); 


}

return Tabledata;
}

















var table = document.getElementById('table');

var cells = [];
var selectedCells = {};
var selectedCellsCount = 0;
var trs = table.getElementsByTagName('tr');



function mergecell(){
    var tableSize = {
        rows: trs.length, 
        cols: trs[0].getElementsByTagName('td').length
    };
    for (var r=0; r<trs.length; r++){
        var tds = trs[r].getElementsByTagName('td');    
        for (var t=0; t<tds.length; t++){
            tds[t].onclick = onCellClick;
            
            tds[t].dataset.idx = t + r*tableSize.cols;        
        }
    }
}


document.getElementById('mergeColsBtn').onclick = function() { merge('colspan'); }
document.getElementById('mergeRowsBtn').onclick = function() { merge('rowspan'); }

function onCellClick(){
    
    var isSelected = this.className.indexOf('selected') >= 0;
   
    if (!isSelected){
        this.className =  'selected'; 
        
        selectedCells[this.dataset.idx] = this;
        selectedCells[this.dataset.idx].style.border="2px solid red"
        console.log(selectedCells[this.dataset.idx]);
        selectedCellsCount++;
    } else {
        this.className = '';   
        selectedCells[this.dataset.idx].style.border="2px solid black"     
        delete selectedCells[this.dataset.idx];
       
        selectedCellsCount--;
    }
    
    isSelected = !isSelected;        
        
}

function merge(spanAttr){

    if (selectedCellsCount == 0) { return; }
    
    var firstCell = false;
    var span = 1;
    
    for(var i in selectedCells){
     	if (!selectedCells.hasOwnProperty(i)) { continue; }
        if (!firstCell) { 
            firstCell = selectedCells[i]; 
            if (firstCell.hasAttribute(spanAttr)){
                span = firstCell.getAttribute(spanAttr);
            }
            continue; 
        }
        var cell = selectedCells[i];
        firstCell.getElementsByTagName("input")[0].value += cell.getElementsByTagName("input")[0].value;
        span++;
        cell.parentNode.removeChild(cell);
    }
    
    firstCell.setAttribute(spanAttr, span);
    firstCell.className = '';
    firstCell.style.border="2px solid black"  
    selectedCells = {};
    selectedCellsCount = 0;
    
}