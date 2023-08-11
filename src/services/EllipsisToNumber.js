export default function addEllipsisToNumber(props) {
  if (typeof props.value === "string" && props.value.length === 10) {
    const part1 = props.value.substring(0, 6);
    const part2 = "...";
    const result = part1 + part2;
    return result;
  } else {
    return props.value;
  }
}
