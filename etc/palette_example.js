var str = '';

var mp = new MonochromaticPalette(0, 50);

var colors = mp.generate( 16, 60 );

for(var color of colors) {
    str += '<div style="display: inline-block; width: 50px; height: 50px;';
    str += ' background-color: hsl(' + color.h + ',' + color.s + '%,' + color.l + '%)"></div>';
}

document.write(str);
