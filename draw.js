const rot_speed = 0.01;
const move_speed = 0.01;
const circle_radius_divisor = 54.2;
const rect_divisor = 27.1;
function get_random(max) {
  return Math.round(Math.random() * max);
}

function update_shape(shape) {
  if (shape.type == "rectangle" || shape.type == "triangle") {
    shape.rotation -= rot_speed;
    shape.translation.set(two.width / 2, two.height / 2);
    shape.height = (two.width + two.height) / rect_divisor;
    shape.width = (two.width + two.height) / rect_divisor
  } else if (shape.type == "circle") {
    let center_x = two.width / 2;
    let center_y = two.height / 2;
    shape.interval++;
    let radius = two.width / 7 + two.height / 7;
    shape.radius = (two.width + two.height) / circle_radius_divisor;
    let radian = move_speed * shape.interval;
    my_x = center_x + radius * Math.cos(radian);
    my_y = center_y + radius * Math.sin(radian);
    shape.translation.set(my_x, my_y);
  }
}

function main() {
  two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(document.body);
  shapes = [
    two.makeRectangle(
      two.width / 2,
      two.height / 2 - two.height / 10,
      (two.width + two.height) / rect_divisor,
      (two.width + two.height) / rect_divisor
    ),
    two.makeCircle(
      two.width / 2,
      two.height / 2,
      (two.width + two.height) / circle_radius_divisor,
      (two.width + two.height) / circle_radius_divisor
    )
  ];
  shapes[0].type = "rectangle";
  shapes[1].type = "circle";
  shapes[1].interval = 0;
  two.bind("update", function() {
    shapes.forEach(update_shape);
  });
}
