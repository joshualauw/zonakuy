<template>
    <ElScrollbar>
        <el-table :header-cell-style="{ backgroundColor: '#f1f5f9' }" :data="tableData" fit style="width: 100%">
            <el-table-column type="index" label="No" width="50" />
            <el-table-column prop="email" label="Email" width="250" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="joined_date" label="Join Date" />
            <el-table-column prop="role" label="Role">
                <template #default="scope" width="120">
                    <ElTag round :type="scope.row.role === 'reguler' ? 'success' : 'warning'" disable-transitions>
                        {{ scope.row.role }}
                    </ElTag>
                </template>
            </el-table-column>
            <el-table-column label="Operations" width="120">
                <template #default="scope">
                    <el-button size="small">Detail</el-button>
                </template>
            </el-table-column>
        </el-table>
    </ElScrollbar>
</template>

<script lang="ts" setup>
let dummy = {
    email: "johnsmith@gmail.com",
    name: "John Smith",
    joined_date: "12/04/23",
    role: "reguler",
};
let tableData = Array.from({ length: 20 }, () => dummy);
</script>
