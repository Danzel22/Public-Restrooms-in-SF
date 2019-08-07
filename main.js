function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  var getAllRecords = function() {
    $.getJSON('https://api.airtable.com/v0/appfchTtyfwSPuum2/Table%201?api_key=keyc3642F0beHuPKy',
      function(airtable){
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var district = record.fields['District'];
          var location = record.fields['Location'];
          var pictures = record.fields['Pictures'];
          html.push(listView(id, district, location, pictures));
        });
        $('.list-view').append(html);
      }
    );
  }

  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/appfchTtyfwSPuum2/Table%201/${id}?api_key=keyc3642F0beHuPKy`,
      function(record){
        var html = [];
        var district = record.fields['District'];
        var location = record.fields['Location'];
        var pictures = record.fields['Pictures'];
        var hours = record.fields['Hours'];
        var ratings = record.fields['Ratings'];
        html.push(detailView(district, location, pictures, hours, ratings));
        $('.detail-view').append(html);
      }
    );
  }

  var listView = function(id, district, location, pictures) {
    return `<div class="col-sm-3 cardImageText">
  <div class="card" style="width: 18rem;">
  ${pictures ? `<img src="${pictures[0].url}">` : ``}
  <div class="card-body">
    <h5 class="card-title">${district}</h5>
    <p class="card-text">${location} <br> </p>
    <a href="index2.html?id=${id}" class="btn btn-primary">Hours</a>
  </div>
  `;
}

var detailView = function(district, location, pictures, hours, ratings) {
  return `
<div class="info">
<div class="card-deck">
  <div class="card border-dark" style="width: 18rem; height: 20rem">
    ${pictures ? `<img src="${pictures[0].url}">` : ``}
  </div>
  
   <div class="card border-dark" style="width: 18rem;">
    <div class="card-body">
      <h2 class="card-title">${district}</h2> 
      <p class="card-text">Address: <br> ${location} </p>
      <p class="card-text">Schedule: <br>${hours}</p>
      <p class="card-text">Ratings: <br>${ratings}</p>
    </div> 
      
    </div>
   </div> 
   `;
  }   

    var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}