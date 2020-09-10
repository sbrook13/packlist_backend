const queryParams = new URLSearchParams(window.location.search)
const user_id = queryParams.get('user_id')

const profileHeader = document.querySelector('#profile-header')

const defaultButton = document.querySelector('#default-lists-button')
const input = document.createElement('input')
    input.type = "hidden"
    input.name = "user_id"
    input.value = user_id

    defaultButton.prepend(input)


fetch(`http://localhost:3500/users/${user_id}`)
    .then(response => response.json())
    .then(user => {
        
        const h1 = document.createElement('h1')

        h1.textContent = `${user.name}'s Packing Lists`

        profileHeader.append(h1)
    })

fetch('http://localhost:3500/packs')
    .then(response => response.json())
    .then(packs => {
        const packSection = document.querySelector('#pack-section')

        packs.forEach(pack => {
            if (pack.user_id == user_id) {
                const packCard = document.createElement('div')
                const subtitle = document.createElement('h3')
                const deleteButton = document.createElement('div')

                packCard.classList.add('display-card')
                subtitle.innerHTML = `<a href="pack.html?user_id=${user_id}&pack_id=${pack.id}">${pack.name}</a>`
                deleteButton.innerHTML = `
                <form id="delete-button" method="POST" action="http://localhost:3500/packs/${pack.id}">
                    <input type="hidden" name="_method" value="delete">
                    <input type="hidden" name="user_id" value=${user_id}>
                    <input type="submit" value="Remove this Pack">
                </form>
                `   
                packCard.append(subtitle, deleteButton)
                packSection.append(packCard)
            }
        })
        
    })

const updateForm = document.querySelector('#update-profile-button')
updateForm.action = `http://localhost:3500/users/${user_id}`

