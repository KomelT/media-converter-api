import ffmpeg from "fluent-ffmpeg"

ffmpeg(`./dummy.jpg`).saveToFile("/tmp/ffmpeg-test.png").run()

export default ffmpeg()
