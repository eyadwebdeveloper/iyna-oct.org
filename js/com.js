    // set up text to print, each item in array is new line
    var aText = new Array(
        "Fight to",
        "be",
        "the best!",
        ""
        );
        // Array.style.color = "#ff0000";
        var iSpeed = 150; // time delay of print out
        var iIndex = 0; // start printing array at this posision
        var iArrLength = aText[0].length; // the length of the text array
        var iScrollAt = 20; // start scrolling up at this many lines
         
        var iTextPos = 0; // initialise text position
        var sContents = ''; // initialise contents variable
        var iRow; // initialise current row
         
        function typewriter()
        {
         sContents =  ' ';
         iRow = Math.max(0, iIndex-iScrollAt);
         var destination = document.getElementById("typedtext");
         
         while ( iRow < iIndex ) {
          sContents += aText[iRow++] + '<br />'+ '<span>';
         }
         destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
         if ( iTextPos++ == iArrLength ) {
          iTextPos = 0;
          iIndex++;
          if ( iIndex != aText.length ) {
           iArrLength = aText[iIndex].length;
           setTimeout("typewriter()",200);
          }
         } else {
          setTimeout("typewriter()", iSpeed);
         }
        }
        
        window.addEventListener("load", function(){
            typewriter();
        });    


       
        // courses Videos START
        let listVideo = document.querySelectorAll('.next_up .video');
        let bigVideo = document.querySelector('.big_video video');
        let title = document.querySelector('.big_video .vid_title');
        let download = document.querySelector('.big_video h2 .video_time')
        let script = document.querySelector('.big_video .vid_script')
        console.log(download.children)
        listVideo.forEach(video =>{
            video.onclick = () =>{
                listVideo.forEach(vid => vid.classList.remove('active'));
                video.classList.add('active');
                if(video.classList.contains('active')){
                    let src = video.children[0].getAttribute('src');
                    bigVideo.src = src;
                    let poster = video.children[0].getAttribute('poster');
                    bigVideo.poster = poster;
                    let down = download.children[0].getAttribute('href');
                    bigVideo.download = down;
                    let text = video.children[1].innerHTML;
                    title.innerHTML = text;
                    let textt  = video.children[2].innerHTML;
                    script.innerHTML =textt;
                };
            };
        });
        // courses Videos END
        