<template>
    <ElScrollbar>
        <el-table :header-cell-style="{ backgroundColor: '#f1f5f9' }" :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="status" label="Status" width="180" />
            <el-table-column prop="amount" label="Amount" width="180" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button size="small">Preview</el-button>
                </template>
            </el-table-column>
        </el-table>
    </ElScrollbar>
</template>

<script lang="ts" setup>
const tableData = [
    {
        date: "21/04/2022",
        name: "Tom Harley",
        status: "payed",
        amount: "Rp. 50.000",
    },
    {
        date: "13/11/2022",
        name: "John Smith",
        status: "canceled",
        amount: "Rp. 50.000",
    },
    {
        date: "15/05/2023",
        name: "Scott Henson",
        status: "payed",
        amount: "Rp. 60.000",
    },
    {
        date: "04/06/2023",
        name: "Lara Croft",
        status: "pending",
        amount: "Rp. 50.000",
    },
    {
        date: "01/02/2023",
        name: "Sebastian Dale",
        status: "payed",
        amount: "Rp. 50.000",
    },
];
</script>
