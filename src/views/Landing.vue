<template>
  <div id="wrapper">
    <nav class="navbar navbar-expand-md navbar-custom w-100" id="navbar">
      <a class="navbar-brand" href="/">
        <img src="../assets/images/logo.png" alt="Icon" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="#navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style="outline: 0; border: none;"
      >
        <span class="navbar-toggler-icon w-100 h-100">
          <i class="fas fa-bars fa-lg"></i>
        </span>
      </button>
      <div class="navbar-collapse collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-4">
            <a href="#team" class="nav-link">About Us</a>
          </li>
          <li class="nav-item mr-4">
            <a href="/signup" class="nav-link">Run</a>
          </li>
          <li class="nav-item mr-4">
            <a href="/login" class="nav-link">Pledge</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="title-icon">
        <div>
          <p class="title">
            WALK FOR THE ROHINGYA
          </p>
          <div class="date-and-buttons">
            <p class="date">
              APRIL 10TH, 2020
            </p>
            <div class="buttons">
              <a href="/login"> <button class="">Run</button> </a>
              <a href="/login">
                <button class="">Pledge</button>
              </a>
            </div>
          </div>
        </div>
        <img src="../assets/images/feet.svg" />
      </div>
    </div>
    <div class="container" id="team">
      <div class="row justify-content-center text-center">
        <div class="col-12 col-md-7">
          <h1 id="about-label">About Us</h1>
          <p>
           Established only four years ago as "Walk for Syria," our annual walkathon, Walk for Refugees, has grown to become one of TAS's biggest charity events. 
           With over 150 Upper School students and faculty members participating in the 2019 walkathon, we raised and donated over $500,000 NT last year to provide North Korean refugees the opportunity to be rescued.
           Though the Syrian and North Korean refugee crises remain pressing issues, the Walk for Refugees team believes that it is also important to continue spotlighting refugee crises around the world. 
           For our upcoming 2020 walkathon this year, named “Walk for the Rohingya”, we will focus on supporting the Rohingya refugees.  

          </p>
          <h3 class="mt-2">
            The Rohingya
          </h3>
          <p>
            Guided under an abusive military regime, hundreds of thousands of Muslim Rohingya in Myanmar have consistently faced human rights abuses since the late 1970s. 
            As a result, nearly a million Rohingyas have fled their homes to seek refuge in countries nearby such as Bangladesh, Indonesia, Malaysia, and Thailand. 
            This issue has recently escalated due to renewed violence, and Myanmar’s security forces have been charged with the ethnic cleansing of the Rohingya Muslims. 
            Through this year’s Walk for Refugees event, the leadership team hopes to spread awareness in the TAS community while raising funds to benefit the Rohingya refugees.  

          </p>
          
        </div>
      </div>

      <h1 id="team-label">Meet the Heads!</h1>
      <div class="row">
         <Portrait
          source="Gretal.jpg"
          person = "Gretal T. (12)"
          title="Co-President"
        ></Portrait>
        <Portrait
          source="Hiro.jpg"
          person="Hironori K. (11)"
          title="Co-President"
        ></Portrait>
          <Portrait
          source="Spencer.jpg"
          person="Spencer C. (11)"
          title="Technology"
        ></Portrait>
        <Portrait
          source="Ian.jpg"
          person="Ian H. (11)"
          title="Technology"
        ></Portrait>
        <Portrait
          source="Mehek.jpg"
          person="Mehek B. (11)"
          title="Experience"
        ></Portrait>
        <Portrait
          source="Samuel.jpg"
          person="Samuel L. (11)"
          title="Money"
        ></Portrait>
        <Portrait
          source="Hiro.jpg"
          person="Issac W. (11)"
          title="Outreach"
        ></Portrait>
        <Portrait
          source="Emma.jpg"
          person="Emma L. (10)"
          title="Research"
        ></Portrait>

      </div>
    </div>
    <footer class="py-5">
      <div class="container">
        <p>Keep in Touch!</p>
        <span>
          <a href="https://www.facebook.com/taswalkforrefugees/">
            <i class="fab fa-facebook-square"></i>
          </a>
          <a href="https://m.me/taswalkforrefugees">
            <i class="fab fa-facebook-messenger"></i>
          </a>
          <a href="https://www.instagram.com/walk4refugees/">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="mailto:walk4refugees@tas.tw"></a>
          <i class="fas fa-envelope"></i>
        </span>
        <p style="font-size: 14px; padding-top: 45px;">Please contact Spencer (21spencerc@students.tas.tw) or Ian (21ianh1@students.tas.tw) if you have any technical difficulties.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Portrait from '../components/Portrait.vue'
require('../assets/portraits/Emma.jpg')
// <div class="row d-flex justify-content-start flex-column">
//   <div class="row buttons w-100 mt-4 flex-row">
//     <div class="col-12 d-flex justify-content-center">
//       <a href="/dashboard">
//         <button class="btn btn-success">Run</button>
//       </a>
//     </div>
//     <div class="col-12 d-flex justify-content-center">
//       <a href="/dashboard">
//         <button class="btn btn-success">Pledge</button>
//       </a>
//     </div>
//   </div>
// </div>

export default {
  name: 'Landing',
  components: {
    Portrait
  },
  beforeCreate: function() {
    document.body.id = 'landing'
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Antonio Regular';
  src: url('../assets/fonts/Antonio-Regular.ttf');
}
@import '../assets/styles/main.scss';
</style>
