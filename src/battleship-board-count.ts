// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
function peek_number(B:string[], x:number, y:number) {
  if(!B || x>=B.length || y>=B[x].length)
      return false;
  return B[x][y] !== '0';
}

function change_number(B:string[], x:number, y:number) {
  if(x>=B.length || y>=B[x].length)
      return false;
  let chars = B[x].split('');
  chars[y] = '0';
  B[x] = chars.join('');
}

function count_numbers(B:string[]):number[] {
  const result = [0,0,0];
  for(const line of B) {
    let chars = line.split('');
    for(const c of chars) {
      if(c!=='0')
        result[(+c)-1]+=1;
    }
  }

  result[1] = result[1] = (result[1] -2*result[2])/2;
  return result;
}

function solution_number(B: string[]): number[] {
  const results:number[] = [0,0,0];
  let copy: string[] = B.map(item => item);
  for(const line of copy) {
    console.log(line);
  }

  for(let x=0;x<copy.length;x++) {
      for(let y=0;y<B[0].length;y++) {
          if(peek_number(copy, x, y)) {
              change_number(copy,x,y);
              // Search for destroyers
              // #.
              // #.
              // #.
              if(peek_number(copy, x+1, y) && peek_number(copy, x+2, y) && !peek_number(copy, x, y+1) && !peek_number(copy, x+1, y+1) ) {
                  change_number(copy,x+1,y);
                  change_number(copy,x+2,y);
                  results[2] +=1;
              } else
              // ###.
              // ....
              if(!peek_number(copy, x+1, y) && peek_number(copy, x, y+1) && peek_number(copy, x, y+2) && !peek_number(copy, x+1, y+1)) {
                  change_number(copy,x,y+1);
                  change_number(copy,x,y+2);
                  results[2] +=1;
              } else
              // ##.
              // #..
              if(peek_number(copy, x+1, y) && !peek_number(copy, x+1, y+1) && peek_number(copy, x, y+1)) {
                  change_number(copy,x+1,y);
                  change_number(copy,x,y+1);
                  results[2] +=1;
              } else
              // ##.
              // .#.
              if(!peek_number(copy, x+1, y) && peek_number(copy, x+1, y+1) && peek_number(copy, x, y+1)) {
                  change_number(copy,x+1,y+1);
                  change_number(copy,x,y+1);
                  results[2] +=1;
              } else
              // .#.
              // ##.
              if(peek_number(copy, x+1, y-1) && peek_number(copy, x+1, y) && !peek_number(copy, x+1, y+1) && !peek_number(copy, x, y+1)) {
                  change_number(copy,x+1,y-1);
                  change_number(copy,x+1,y);
                  results[2] +=1;
              } else
              // #..
              // ##.
              if(peek_number(copy, x+1, y) && peek_number(copy, x+1, y+1) && !peek_number(copy, x, y+1)) {
                  change_number(copy,x+1,y);
                  change_number(copy,x+1,y+1);
                  results[2] +=1;
              } else
              
              // Submarines
              // #.
              // #.
              if(peek_number(copy, x+1, y) && !peek_number(copy, x, y+1)) {
                  change_number(copy,x+1,y);
                  results[1]+=1;
              } else
              // ##
              // ..
              if(!peek_number(copy, x+1, y) && peek_number(copy, x, y+1)) {
                  change_number(copy,x,y+1);
                  results[1]+=1;
              } else {
                  results[0]+=1
              }
          }
      }
  }
  
  console.log(count_numbers(B));
  return results;
}

console.log(solution_number ([
  '230', 
  '202', 
  '023'
]));
console.log(solution_number ([
  '02301', 
  '20200', 
  '30001', 
  '20220'
]));
console.log(solution_number ([
  '000',
  '000', 
  '000'
]));
console.log(solution_number ([
  '0200',
  '0320',
  '0000'
]));

console.log(solution_number ([
  '02000200',
  '03202300',
  '00002222'
]));


