export interface Project{
    allocation: number,
    pname: string,
    pcode: string, 
    ecode: string,
    ename: string 
}
export interface ProjectList{
    id: string,
    employee_code: string,
    user_name: string,
    project_code: string,
    project_name: string,
    project_lead: string,
    project_technology: string,
    start_date: string,
    end_date: string,
    created_date: string,
    updated_date: string,
    projects: [{
        id: string,
    employee_code: string,
    user_name: string,
    project_code: string,
    project_name: string,
    project_lead: string,
    project_technology: string,
    start_date: string,
    end_date: string,
    created_date: string,
    updated_date: string
}
    ] 
}