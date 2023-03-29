$(document).ready(function(){
    let edit = false;
    console.log('JQuery is Working');
    $('#task-result').hide();
    fetchTask(); 
    $('.td-hide').hide();
    $('#pagination').DataTable({
        searching: false,
    });
    
    $.extend(true, $.fn.dataTable.defaults, {
        searching: false,
    });

    $('#search').keyup(function(e) {
        if($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                method: 'POST',
                data: { "search": search },
                success: function(response) {
                    let tasks = JSON.parse(response);
                    let template = `
                        <table id="pagination" class= "table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;
                    tasks.forEach(task => {
                        template += `
                            <tr>
                                <td>${task.name}</td>
                            </tr>
                        `;
                    });
                    template += `
                            </tbody>
                        </table>
                    `;
                    $('#container').html(template);
                    $('#task-result').show();
                    $('#pagination').DataTable();
                }
            });
        }
    });

    $('#task-form').submit((e) =>{
        const postData = {
            id: $('#task-id').val(),
            name: $('#name').val(),
            description: $('#description').val(),
        };
        
        let url = edit === false ? 'task-add.php':'task-edit.php';
        console.log(url)
        $.post(url, postData, (response) => {
            console.log(response)
           fetchTask()

           $('#task-form').trigger('reset')
        })
        e.preventDefault();

    });

    $(document).on('click', '.task-delete', function () {
        if(confirm('Are you sure you want to delete?')){
            let element = $(this)[0].parentElement.parentElement   
            let id = $(element).attr('taskID');
            $.post('task-delete.php', {id}, function (response){
                fetchTask()   
        })
           
        } 

    });

    $(document).on('click', '.task-item', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskID');
        $.post('task-single.php', {id}, function (response){
            const task = JSON.parse(response)
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#task-id').val(task.id);
            edit = true;
            
        })
    })

    function fetchTask(){
        $('#example').DataTable();
        $('.td-hide').hide();
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response)
                let template = "";
                tasks.forEach(task => {
                    template += `
                    <tr taskID="${task.id}">
                        <td class="td-hide d-none">${task.id}</td>
                        <td>
                            <a href="#" class="task-item">
                                ${task.name}
                            </a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                            <button class='task-delete btn btn-danger'>
                                Delete
                            </button>
                        </td>
                    </tr>
                    `
                });
                $('#tasks').html(template)
                $('#pagination').DataTable();
            }
        })
    }

});