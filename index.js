let form=document.querySelector("form");
form.addEventListener("submit",myfunc);
  function myfunc(){
      event.preventDefault();
      let name =form.name.value;
      console.log(name);
      name=name.trim().split(" ").join("+");
      
      console.log(name);
      const url = `https://www.omdbapi.com/?apikey=1af9e5d9&t=${name}`;
      const container = document.getElementById("box");   
      fetch(url)
      .then(function(res){
          return res.json();
      })
      .then(function(res){
          if(res.Response=="True"){
              console.log(res);
              appendData(res);
          }
          else{
              console.log("Movie is not Present");
              let d=document.getElementById("cont");
              let img=document.createElement("img");
              img.src="https://www.brainpop.com/conceptmap/img/img_noresults_movies.png";
              d.append(img);
              
          }
      })
      .catch(function (err){
          console.log("err:",err);
      });
      function appendData(data) {
          let div=document.createElement("div");
          let tittle = document.createElement("h1");
          tittle.innerText = `Title: ${data.Title}`;
          let actor = document.createElement("p");
          actor.innerText = `Actor: ${data.Actors}`;
          let image = document.createElement("img");
          image.src = data.Poster;
          let release=document.createElement("p");
          release.innerText= `Released Date:${data.Released}`;
          div1=document.createElement("div");
          div1.style.display="flex";
            
          let rating = document.createElement("p");
          let r=document.createElement("p");
          
          r.style.marginLeft="4%"
          rating.innerText=`Rating: ${data.Ratings[0].Value}`;
          let[x,y]=data.Ratings[0].Value.split("/").map(Number);

         if(x>8.5){
           r.innerText="recommended";
           r.style.color="red";
         }
          div1.append(rating,r);
          div.append(image, tittle, actor,release,div1);
          container.append(div);
          console.log(data);
        }
  }

 