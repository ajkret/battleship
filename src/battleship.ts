// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
function peek(B:string[], x:number, y:number) {
  if(!B || x>=B.length || y>=B[x].length)
      return false;
  return B[x][y] == '#';
}

function change(B:string[], x:number, y:number) {
  if(x>=B.length || y>=B[x].length)
      return false;
  let chars = B[x].split('');
  chars[y] = '*';
  B[x] = chars.join('');
}

function solution(B: string[]): number[] {
  const results:number[] = [0,0,0];
  let copy: string[] = B.map(item => item);
  for(let x=0;x<copy.length;x++) {
    console.log(copy[x]);
  }

  for(let x=0;x<copy.length;x++) {
      for(let y=0;y<B[0].length;y++) {
          if(peek(copy, x, y)) {
              change(copy,x,y);
              // Search for destroyers
              // #.
              // #.
              // #.
              if(peek(copy, x+1, y) && peek(copy, x+2, y) && !peek(copy, x, y+1) && !peek(copy, x+1, y+1) ) {
                  change(copy,x+1,y);
                  change(copy,x+2,y);
                  results[2] +=1;
              } else
              // ###.
              // ....
              if(!peek(copy, x+1, y) && peek(copy, x, y+1) && peek(copy, x, y+2) && !peek(copy, x+1, y+1)) {
                  change(copy,x,y+1);
                  change(copy,x,y+2);
                  results[2] +=1;
              } else
              // ##.
              // #..
              if(peek(copy, x+1, y) && !peek(copy, x+1, y+1) && peek(copy, x, y+1)) {
                  change(copy,x+1,y);
                  change(copy,x,y+1);
                  results[2] +=1;
              } else
              // ##.
              // .#.
              if(!peek(copy, x+1, y) && peek(copy, x+1, y+1) && peek(copy, x, y+1)) {
                  change(copy,x+1,y+1);
                  change(copy,x,y+1);
                  results[2] +=1;
              } else
              // .#.
              // ##.
              if(peek(copy, x+1, y-1) && peek(copy, x+1, y) && !peek(copy, x+1, y+1) && !peek(copy, x, y+1)) {
                  change(copy,x+1,y-1);
                  change(copy,x+1,y);
                  results[2] +=1;
              } else
              // #..
              // ##.
              if(peek(copy, x+1, y) && peek(copy, x+1, y+1) && !peek(copy, x, y+1)) {
                  change(copy,x+1,y);
                  change(copy,x+1,y+1);
                  results[2] +=1;
              } else
              
              // Submarines
              // #.
              // #.
              if(peek(copy, x+1, y) && !peek(copy, x, y+1)) {
                  change(copy,x+1,y);
                  results[1]+=1;
              } else
              // ##
              // ..
              if(!peek(copy, x+1, y) && peek(copy, x, y+1)) {
                  change(copy,x,y+1);
                  results[1]+=1;
              } else {
                  results[0]+=1
              }
          }
      }
  }

  return results;
}

console.log(solution (['##.', '#.#', '.##']));
console.log(solution (['.##.#', '#.#..', '#...#', '#.##.']));
console.log(solution (['...','...', '...']));
console.log(solution ([
  '.#..',
  '.##.',
  '....' , 
]));

