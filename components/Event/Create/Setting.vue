<template>
    <div>
        <div class="space-y-1 flex flex-col">
            <ElCheckbox label="Enable notification for users" />
            <ElCheckbox label="Enable chatting page" />
            <ElCheckbox label="Enable collaborator access" />
        </div>
        <h3 class="my-6 font-semibold">Actions</h3>
        <div>
            <ElButton type="primary" size="large">
                <Icon name="fa:eye" class="w-4 h-4 mr-2" /> Change publicity
            </ElButton>
            <ElButton type="danger" size="large">
                <Icon name="material-symbols:warning" class="w-4 h-4 mr-2" />Delete Event
            </ElButton>
        </div>
    </div>
</template>
