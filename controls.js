//init elements
var E_File = document.getElementById('@File')
var E_IntervalMin = document.getElementById('@IntervalMin')
var E_IntervalMax = document.getElementById('@IntervalMax')
var E_Control = document.getElementById('@Control')
var E_Test = document.getElementById('@Test')

//variables
var isPlaying = false
var nextStep = 0

//helper function to pick index from an array
function pickIdx(ar) {
    return Math.round(Math.random()*ar.length)
}

//play
function play() {
    if(!E_File.files[0]) return console.warn('no file is selected')

    idx = 0
    fls = E_File.files

    if(E_File.files.length > 1) {
        idx = pickIdx(fls)
    }

    ObjectURL = URL.createObjectURL(fls[idx]||fls[0])

    var audio = new Audio(URL.createObjectURL(fls[idx]||fls[0]))
    audio.play()
    URL.revokeObjectURL(ObjectURL)
}

//stuff
E_Control.addEventListener('click', () => {
    if(!E_File.files[0]) return console.warn('cannot start without a file, dummy')

    isPlaying = !isPlaying
    E_Control.innerHTML = `Playing: ${isPlaying}`
})

E_Test.addEventListener('click', () => {
   play()
   nextStep = 0
})

setInterval(() => {
    if(isPlaying & Date.now() > nextStep) {
        play()

        let expr = (Math.round(Math.random() * parseInt((E_IntervalMax.value-E_IntervalMin.value)||10)) + parseInt(E_IntervalMin.value||1))

        nextStep = Date.now() + (parseInt(expr) * 1000)
        console.log(`(debug) next play at ${nextStep}\n    - in ${Math.abs((Date.now() - nextStep) / 1000)} seconds\n    - date ${new Date(nextStep).toGMTString()}`)
    }
},100)