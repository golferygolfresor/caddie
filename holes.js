// Hole centrelines (tee → … → green) from OpenStreetMap, © OpenStreetMap contributors, ODbL.
// Each hole: array of [lat, lng]; first point is the tee, last point is the green centre.
window.HOLES = {
  // PGA Sultan: hole 1 from OSM (tee/green mapped); holes 2–18 to be added with "Map this course".
  agcsultan: { 1:[[36.8678203,30.9934909],[36.8645993,30.9955764]] },
  carya: {
    1:[[36.8677690,31.0093701],[36.8690537,31.0070690],[36.8693400,31.0058433]],
    2:[[36.8698143,31.0058835],[36.8701925,31.0076527]],
    3:[[36.8695864,31.0075580],[36.8683931,31.0096256],[36.8679070,31.0111803]],
    4:[[36.8678546,31.0119224],[36.8674884,31.0156868]],
    5:[[36.8675643,31.0165077],[36.8688838,31.0181886],[36.8690227,31.0193645]],
    6:[[36.8687639,31.0196960],[36.8681199,31.0182123]],
    7:[[36.8677855,31.0181309],[36.8648812,31.0144692]],
    8:[[36.8641677,31.0147691],[36.8647360,31.0131907]],
    9:[[36.8650623,31.0127231],[36.8661395,31.0150601],[36.8669242,31.0159929]],
    10:[[36.8668935,31.0151659],[36.8673705,31.0115979],[36.8673782,31.0099341]],
    11:[[36.8669935,31.0098476],[36.8666011,31.0123769],[36.8666780,31.0133963]],
    12:[[36.8665780,31.0144830],[36.8658702,31.0120114],[36.8665088,31.0094725]],
    13:[[36.8657855,31.0088281],[36.8649622,31.0059814],[36.8644621,31.0054236]],
    14:[[36.8652392,31.0055486],[36.8666088,31.0052794]],
    15:[[36.8675321,31.0045292],[36.8644390,31.0045869],[36.8634234,31.0044715]],
    16:[[36.8634926,31.0050678],[36.8650084,31.0079048]],
    17:[[36.8652239,31.0084145],[36.8640466,31.0110689],[36.8632772,31.0122614]],
    18:[[36.8631156,31.0133866],[36.8644160,31.0116074],[36.8650238,31.0102033]]
  }
};

// Course facts: par, tee distances (m) and the club's own pro tips. Source: agc.com.tr (PGA Sultan course guide).
window.COURSE_META = {
  agcsultan: {
    tees:["Black","Yellow","White","Red"],
    holes:{
      1:{par:4,name:"First Crossing",d:[407,369,348,303],tip:"Keep a little left off the tee to avoid the water for a steady start."},
      2:{par:3,name:"Surrounded",d:[154,139,122,100],tip:"The gentlest par 3 — but avoid the pot bunkers."},
      3:{par:5,name:"Gamble",d:[485,472,449,430],tip:"Don't miss this green on the left: water. Short par 5, best birdie chance on the front nine."},
      4:{par:4,name:"The Pines",d:[420,400,380,335],tip:"Aim at the big pines right of the fairway with a slight draw. Left side gives the best approach on the toughest par 4."},
      5:{par:4,name:"Sea View",d:[341,326,306,286],tip:"Plenty of club for the second shot; enjoy the Mediterranean view at the green."},
      6:{par:3,name:"The Siren",d:[219,205,188,167],tip:"Big inviting target but it plays longer than it looks — take an extra club."},
      7:{par:5,name:"Hannibal",d:[492,457,439,412],tip:"Don't cut the corner. Play to the wide landing areas for a safe par."},
      8:{par:3,name:"The Hoopoe",d:[186,174,161,135],tip:"Lake right, stream left — a committed mid-iron finds the green."},
      9:{par:4,name:"The Choice",d:[329,304,279,237],tip:"Brave line between bunkers and lake shortens the hole; the safe right side adds two clubs to the approach."},
      10:{par:4,name:"The Key Hole",d:[361,330,308,284],tip:"Gentle fade to the wide part of the fairway. Stay clear of the cliff wall left of the green."},
      11:{par:4,name:"Taurus View",d:[366,343,309,277],tip:"Steady drive to the top of the slope, then an approach between the lakes. No lay-up: take enough club."},
      12:{par:5,name:"Eucalyptus Drive",d:[433,422,390,363],tip:"Narrow, long, bunkers all the way. Be proud of par."},
      13:{par:4,name:"Spectacles",d:[401,356,332,300],tip:"Drive between the tall trees, then lots of club to carry 'the spectacles' bunkers."},
      14:{par:4,name:"Bunkered",d:[373,326,296,270],tip:"The most bunkered hole you'll see. Staying on grass all the way is an achievement."},
      15:{par:4,name:"The Long Fellow",d:[393,367,340,293],tip:"Straight and gentle — the calm before the storm. Birdie chance before the finish."},
      16:{par:5,name:"Temptation",d:[539,445,433,366],tip:"Decision time: a long carry brings the green in range of two great shots, but caution pays for a score."},
      17:{par:3,name:"The Gap",d:[174,137,132,110],tip:"Easiest hole once you're through the gap in the pines."},
      18:{par:4,name:"Looking Back",d:[404,386,363,335],tip:"Spectacular finish with the Taurus mountains behind. Needs full concentration."}
    }
  }
};
