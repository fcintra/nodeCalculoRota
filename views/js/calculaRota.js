
    $('#calculaRota').on('click', () =>{
      var nomeLocal = $('#nomeLocal').val()
      var latLocal = $('#latLocal').val()
        var lonLocal = $('#lonLocal').val()

        var nomeLocal2 = $('#nomeLocal2').val()
        var latLocal2 = $('#latLocal2').val()
        var lonLocal2 = $('#lonLocal2').val()

       // console.log(nomeLocal)

       console.log(getDistanceFromLatLonInKm(latLocal, lonLocal, latLocal2, lonLocal2).toFixed(1)+'km')
      //  console.log('deu bom', nomeLocal)
    })








function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }