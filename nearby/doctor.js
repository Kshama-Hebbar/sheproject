const location=()=>{
    const success = (position)=>{
      console.log(position)
      const latitude=position.coords.latitude;
      const longitude=position.coords.longitude;
    }
    const error = ()=>{
      status.textContent = 'unable to retrieve ur location';
  
    }
    navigator.geolocation.getCurrentPosition(success,error);
  }
  document.querySelector('.find-location').addEventListener('click',location);
  