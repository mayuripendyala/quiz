function switchPage(from, to) {
    var location= window.location.pathname;
   location = location.replace(from,to);
    console.log(location);
     window.location.assign(location);
  }
