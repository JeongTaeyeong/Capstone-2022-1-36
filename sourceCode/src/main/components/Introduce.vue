<template>
  <b-carousel
    id="carousel-1"
    v-model="slide"
    :interval="4000"
    controls
    indicators
    background="#ffffff"
    img-width="1024"
    img-height="480"
    style="text-shadow: 1px 1px 2px #333;"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <!-- Slides with img slot -->
    <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
    <b-carousel-slide>
      <template #img>
        <img
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          src="../../assets/intro1.jpg"
          alt="image slot"
        >
      </template>
    </b-carousel-slide>
    
    <b-carousel-slide>
      <template #img>
        <img
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          src="../../assets/intro2.jpg"
          alt="image slot"
        >
      </template>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style scoped>
#carousel-1 {
  margin-bottom: 1rem;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid lightgreen;
}
</style>