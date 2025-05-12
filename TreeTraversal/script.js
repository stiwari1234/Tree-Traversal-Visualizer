
const tree = {
  name: "1",
  children: [
    { name: "3" },
    {
      name: "2",
      children: [
        {
          name: "5",
          children: [{ name: "7" }, { name: "6" }]
        },
        { name: "4" }
      ]
    }
  ]
};

function clearTraversal() {
  document.querySelectorAll('.node').forEach(node => {
    node.classList.remove('traversed');
  });
  document.getElementById('output').textContent = '';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function highlightTraversal(order) {
  for (let val of order) {
    const node = document.getElementById(val);
    if (node) {
      node.classList.add('traversed');
      document.getElementById('output').textContent += val + ' ';
      await sleep(1000);
    }
  }
}

function inorder(node, order = []) {
  if (!node) return order;
  const children = node.children || [];
  if (children.length === 2) {
    inorder(children[0], order);
    order.push(node.name);
    inorder(children[1], order);
  } else {
    if (children.length === 1) inorder(children[0], order);
    order.push(node.name);
  }
  return order;
}

function preorder(node, order = []) {
  if (!node) return order;
  order.push(node.name);
  const children = node.children || [];
  for (let child of children) {
    preorder(child, order);
  }
  return order;
}

function postorder(node, order = []) {
  if (!node) return order;
  const children = node.children || [];
  for (let child of children) {
    postorder(child, order);
  }
  order.push(node.name);
  return order;
}

function levelorder(root) {
  const order = [];
  const queue = [root];
  while (queue.length) {
    const current = queue.shift();
    order.push(current.name);
    if (current.children) {
      queue.push(...current.children);
    }
  }
  return order;
}

function startTraversal() {
  clearTraversal();
  const type = document.getElementById('traversalSelect').value;
  let order = [];
  if (type === 'inorder') order = inorder(tree);
  else if (type === 'preorder') order = preorder(tree);
  else if (type === 'postorder') order = postorder(tree);
  else if (type === 'levelorder') order = levelorder(tree);
  highlightTraversal(order);
}
