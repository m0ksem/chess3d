<script setup lang="ts">
  import { WebGLRenderer, PerspectiveCamera, Scene, AmbientLight, Mesh, MeshBasicMaterial } from 'three'
  import table from '../assets/models/table.obj?three'
  import chibi from '../assets/models/chibi.obj?three'

  const canvas = ref<HTMLCanvasElement>()

  const movePawn = (pawn: typeof chibi, x: number, z: number) => {
    // normalize: move to top left and center on cell
    pawn.position.x = -4 + 0.5
    pawn.position.z = -4 + 0.5
    pawn.position.x += x
    pawn.position.z += z
  }

  onMounted(() => {
    if (!canvas.value) { return }

    canvas.value.width = canvas.value.clientWidth
    canvas.value.height = canvas.value.clientHeight

    const renderer = new WebGLRenderer({ canvas: canvas.value, alpha: true })

    const camera = new PerspectiveCamera(75, canvas.value.width / canvas.value.height, 1, 1000)
    camera.position.set(0, 5, 5)
    camera.lookAt(0, 0, 0)

    // 4, but we have borders so 4.2
    table.scale.set(4.2, 4.2, 4.2)

    const scene = new Scene()

    const whitePawnMaterial = new MeshBasicMaterial({ color: 0xeeeeee })
    for (let i = 0; i < 8; i++) {
      const pawn = chibi.clone(true)
      pawn.children.forEach((c) => (c as Mesh).material = whitePawnMaterial)
      scene.add(pawn)
      movePawn(pawn, i, 1)
    }

    const blackPawnMaterial = new MeshBasicMaterial({ color: 0x222222 })
    for (let i = 0; i < 8; i++) {
      const pawn = chibi.clone()
      pawn.children.forEach((c) => (c as Mesh).material = blackPawnMaterial)
      scene.add(pawn)
      movePawn(pawn, i, 6)
    }
    
    scene
      .add(table)
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