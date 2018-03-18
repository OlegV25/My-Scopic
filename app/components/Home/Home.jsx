import React, {Component} from 'react'
import './Home.styl'

class Home extends Component {
  state = {
    JSONData: '',
    nodesTree: '',
    renderTree: ''
  }
  nodesId = 0
  parentalConnection = {}
  getUniqueId = () => ++this.nodesId
  walkByNodes = (node, parentId) => {
    for (let i in node) {
      node[i].isChecked = false
      node[i].id = this.getUniqueId()
      this.parentalConnection[node[i].id] = parentId
      node[i].parendtId = parentId
      node[i].children && this.walkByNodes(node[i].children, node[i].id)
    }
    return node
  }
  selectByNodes = (node, id) => {
    for (let i in node) {
      if (node[i].id === id) {
        node[i].isChecked = !node[i].isChecked
        this.changeChildrenVisibility(node[i].children, node[i].isChecked)
      }
      node[i].children && this.selectByNodes(node[i].children, id)
    }
    return node
  }
  changeChildrenVisibility = (node, isChecked) => {
    for (let i in node) {
      node[i].isChecked = isChecked
      node[i].children && this.changeChildrenVisibility(node[i].children, isChecked)
    }
  }
  changeParentsVisibility = id => {
    let wayToNode = this.createWayToCurrentNode(id)
    let newNodesTree = {
      0: {
        id: 0,
        children: this.state.nodesTree
      }
    }
    for (let i = 0, l = wayToNode.length; i < l; i++) {
      this.getParent(wayToNode, newNodesTree)
      wayToNode.pop()
    }
  }
  createWayToCurrentNode = id => {
    let wayToNode = []
    while (id !== 0) {
      for (let i in this.parentalConnection) {
        if (+i === id) {
          wayToNode.unshift(this.parentalConnection[i])
          id = this.parentalConnection[i]
        }
      }
    }
    return wayToNode
  }
  getParent (wayToNode, nodesTree) {
    let parent = nodesTree
    for (let i = 0, l = wayToNode.length; i < l; i++) {
      for (let j in parent) {
        if (parent[j].id === wayToNode[i]) {
          parent = +i === l - 1 ? parent[j] : parent[j].children
          break
        }
      }
    }
    parent.isChecked = parent.children.every(i => i.isChecked)
  }
  onNodeSelect = e => {
    let id = +e.target.getAttribute('data-id')
    if (id) {
      let nodesTree = this.selectByNodes(this.state.nodesTree, id)
      this.changeParentsVisibility(id)
      const renderTree = this.renderNodes(nodesTree)
      this.setState({ renderTree, nodesTree })
    }
  }
  onCreateTree = () => {
    const nodesTree = this.walkByNodes(JSON.parse(this.state.JSONData), 0)
    const renderTree = this.renderNodes(nodesTree)
    this.setState({ renderTree, nodesTree })
  }
  onInputChange = e => {
    this.setState({JSONData: e.target.value})
  }
  renderNodes (node) {
    let renderData = []
    for (let i in node) {
      renderData.push(
        <li key={node[i].id} >
          {<input type='checkbox' data-id={node[i].id} checked={node[i].isChecked} />}
          {node[i].name}
          {node[i].children && this.renderNodes(node[i].children)}
        </li>
      )
    }
    return <ul>{renderData}</ul>
  }
  render () {
    const { JSONData, renderTree } = this.state
    return (
      <div className='Home'>
        <input onChange={this.onInputChange} placeholder='Enter your JSON' className='Home__input' value={JSONData} />
        <div className='Home__button' onClick={this.onCreateTree}>Create a tree</div>
        <div className='Home__node-tree' onClick={this.onNodeSelect}>{renderTree}</div>
      </div>
    )
  }
}
export default Home
