<script setup lang="ts">
  import { WebGLRenderer, PerspectiveCamera, Scene, AmbientLight, Plane } from 'three'
  import Table from '../assets/models/table.obj?three'
  import Pawn from '../assets/models/pawn/pawn.obj?three'

  const canvas = ref<HTMLCanvasElement>()

  const movePawn = (pawn: typeof Pawn, x: number, z: number) => {
    // normalize
    pawn.position.x = 1/4 * -4 + 1/8
    pawn.position.z = 1/4 * 3 + 1/8
    // Move
    pawn.position.x += x * 1/4
    pawn.position.z += z * -1/4
  }

  onMounted(() => {
    if (!canvas.value) { return }

    canvas.value.width = canvas.value.clientWidth
    canvas.value.height = canvas.value.clientHeight

    const renderer = new WebGLRenderer({ canvas: canvas.value, alpha: true })

    const camera = new PerspectiveCamera(75, canvas.value.width / canvas.value.height, 1, 1000)
    camera.position.z = 2
    camera.position.y = 2
    camera.lookAt(0, 0, 0)

    const scene = new Scene()

    Table.scale.set(0.25, 0.25, 0.25)

    for (let i = 0; i < 8; i++) {
      const pawn = Pawn.clone()
      scene.add(pawn)
      movePawn(pawn, i, 1)
    }
    
    scene
      .add(Table)
      .add(new AmbientLight(0xffffff, 2))

    const render = () => {
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    render()
  })
</script>

<template>
  <canvas ref="canvas" />
</template>