<script lang="ts">
  export let name: string
  export let dob: string
</script>

<span>
  <strong>
    Hello, {name}
  </strong>
</span>
<span>
  {dob}
</span>

<style lang="postcss">
  span {
    display: inline-block;
    width: 100px;
  }
</style>
